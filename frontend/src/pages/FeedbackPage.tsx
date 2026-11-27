import { FeedbackForm } from '../components/FeedbackForm';
export function FeedbackPage() {
  return <div className="page-shell">
    <header><a className="brand" href="/" aria-label="Oyuns нүүр"><span className="brand-mark">O</span>oyuns<span className="brand-dot">.</span></a><span className="header-label">Санал хүсэлтийн төв</span></header>
    <main><section className="intro"><div className="section-tag"><span />ХАМТДАА САЙЖРУУЛЪЯ</div><h1>Таны санал.<br />Бидний <em>дараагийн<br className="desktop-break" /> алхам.</em></h1><p className="intro-description">Жижиг санаа ч том өөрчлөлтийн эхлэл.<br />Танд төрсөн санал, хүсэлт, сэтгэгдэл бүр<br className="desktop-break" /> бидэнд үнэ цэнтэй.</p><div className="intro-note"><span aria-hidden="true">↗</span><p>Илүү сайн үйлчилгээг<br /><strong>хамтдаа бүтээцгээе.</strong></p></div><div className="decor" aria-hidden="true"><span /><span /><span /></div></section><section className="form-card" aria-label="Санал хүсэлтийн маягт"><FeedbackForm /></section></main>
    <footer><span>© {new Date().getFullYear()} Oyuns</span><span>Таны оролцоо өөрчлөлт авчирна.</span></footer>
  </div>;
}

