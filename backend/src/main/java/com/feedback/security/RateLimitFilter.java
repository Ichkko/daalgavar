package com.feedback.security;

import com.feedback.config.RateLimitConfig;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

@Component public class RateLimitFilter extends OncePerRequestFilter {
    private final RateLimitConfig config; private final ConcurrentMap<String,Window> windows=new ConcurrentHashMap<>();
    public RateLimitFilter(RateLimitConfig config){this.config=config;}
    @Override protected boolean shouldNotFilter(HttpServletRequest req){return !"POST".equalsIgnoreCase(req.getMethod())||!req.getRequestURI().startsWith("/api/feedback");}
    @Override protected void doFilterInternal(HttpServletRequest req,HttpServletResponse res,FilterChain chain)throws ServletException,IOException{
        String ip=req.getRemoteAddr();long now=System.currentTimeMillis(),window=config.getWindowSeconds()*1000;
        Window w=windows.compute(ip,(k,v)->v==null||now-v.started>=window?new Window(now,new AtomicInteger()):v);
        if(w.count.incrementAndGet()>config.getMaxRequests()){res.setStatus(429);res.setContentType(MediaType.APPLICATION_JSON_VALUE);res.getWriter().write("{\"error\":\"Хэт олон хүсэлт илгээлээ.\"}");return;}
        chain.doFilter(req,res);
    }
    private record Window(long started,AtomicInteger count){}
}
