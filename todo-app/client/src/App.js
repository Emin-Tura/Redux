import './App.css';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <section className='todoapp'>
        <Header />
        <Content />
      </section>
      <Footer />
    </>
  );
}

export default App;
