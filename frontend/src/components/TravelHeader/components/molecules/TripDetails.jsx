import LinkWithIcon from '../atoms/LinkWithIcon';
import ArrowRightSVG from '../../../../assets/TravelHeader/Arrow Right.svg';
import PersonSVG from '../../../../assets/TravelHeader/Person.svg';
import CalendarSVG from '../../../../assets/TravelHeader/Calendar.svg';
import SingleCityLink from '../atoms/SingleCityLink';
import IconCityLink from '../atoms/IconCityLink';

function TripDetails() {
  return (
    <>
      <SingleCityLink href='/#' text='Buenos Aires' />
      <IconCityLink
        iconSrc={ArrowRightSVG}
        iconAlt='Arrow Right'
        href='/#'
        text='Mar del Plata'
      />
      <LinkWithIcon
        link='/#'
        iconSrc={CalendarSVG}
        altText='Calendar'
        text='14 de
            Marzo'
        position='start'
      />
      <LinkWithIcon
        link='/#'
        iconSrc={PersonSVG}
        altText='Person'
        text='1 Adulto'
        position='end'
      />
    </>
  );
}

export default TripDetails;
