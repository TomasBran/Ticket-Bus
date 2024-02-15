import TravelStepsWrapper from '../components/TravelStepsWrapper.jsx';
import BenefitPictures from '../components/BenefitPictures.jsx';
import Hero from '../components/Hero.jsx';
import FormSearchTravels from '../components/FormSearchTravels/components/organisms/FormSearchTravels.jsx';
import Profits from '../components/Profits.jsx';

function Home() {
  return (
    <main>
      <Hero />
      <FormSearchTravels />
      <TravelStepsWrapper />
      <Profits />
      <BenefitPictures />
    </main>
  );
}

export default Home;
