import LinkWithIcon from '../atoms/LinkWithIcon';
import ArrowRightSVG from '../../../../assets/TravelHeader/Arrow Right.svg';
import PersonSVG from '../../../../assets/TravelHeader/Person.svg';
import CalendarSVG from '../../../../assets/TravelHeader/Calendar.svg';
import SingleCityLink from '../atoms/SingleCityLink';
import IconCityLink from '../atoms/IconCityLink';
import { useQueryParams } from '../../../../hooks/useQueryParams';
import { formatDateForTravelHeader } from '../../../../utils/dateUtils.js';

function TripDetails() {
  const queryParams = useQueryParams();
  const date = formatDateForTravelHeader(queryParams.date);

  return (
    <>
      <SingleCityLink href='/#' text={queryParams.origin} />
      <IconCityLink
        iconSrc={ArrowRightSVG}
        iconAlt='Arrow Right'
        href='/#'
        text={queryParams.destination}
      />
      <LinkWithIcon
        link='/#'
        iconSrc={CalendarSVG}
        altText='Calendar'
        text={date}
        position='start'
      />
      <LinkWithIcon
        link='/#'
        iconSrc={PersonSVG}
        altText='Person'
        text={`${queryParams.passengers} Adulto`}
        position='end'
      />
    </>
  );
}

export default TripDetails;
