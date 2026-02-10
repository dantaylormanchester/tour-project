import React from 'react';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ImageGallery from '../components/ImageGallery';
import Badge from '../components/Badge';
import BookingWidget from '../components/BookingWidget';
import TourCard from '../components/TourCard';
import Divider from '../components/Divider';
import heroVideo from '../assets/tours-hero-new.mp4';
import './StadiumTourPage.css';

const TicketIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="3" y="6" width="10" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M7 6V10M9 6V10" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);

const WheelchairIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M8 7V11M6 11H10M8 11C6.5 11 5 10 5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const GuideIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5" r="2" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M4 14C4 11.5 5.5 9.5 8 9.5C10.5 9.5 12 11.5 12 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#0d775d" strokeWidth="2"/>
    <path d="M8 12L11 15L16 9" stroke="#0d775d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function StadiumTourPage() {
  const breadcrumbItems = [
    { label: 'Experiences', onClick: () => console.log('Experiences') },
    { label: 'Stadium Tours', active: true }
  ];

  const galleryImages = [
    'https://picsum.photos/seed/stadium1/500/333',
    'https://picsum.photos/seed/stadium2/500/333',
    'https://picsum.photos/seed/stadium3/500/333',
    'https://picsum.photos/seed/stadium4/500/333',
    'https://picsum.photos/seed/stadium5/500/333',
  ];

  const tourCardImage = 'https://picsum.photos/seed/tourcard/500/333';

  return (
    <div className="stadium-tour-page">
      <Header />

      <main className="stadium-tour-page__content">
        <div className="stadium-tour-page__section">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="stadium-tour-page__title">STADIUM TOURS</h1>
        </div>

        <ImageGallery images={galleryImages} mainVideo={heroVideo} />

        <div className="stadium-tour-page__section stadium-tour-page__section--details">
          <div className="stadium-tour-page__description">
            <p className="stadium-tour-page__description-paragraph">
              Immerse yourself in the City story on the Manchester City Stadium Tour.
              Visit areas of the Stadium not usually available to the public.
            </p>
            <p className="stadium-tour-page__description-paragraph">
              Using the latest technology, dreams come true as you and your loved ones
              sit and interact with Pep Guardiola in the press room. Immerse yourself
              in the City Story as you walk out of the glass players' tunnel, sit in
              the seats in the dug outs and soak up the views of the stadium from
              pitchside! There is a surprise at every turn!
            </p>
          </div>

          <div className="stadium-tour-page__features">
            <Badge icon={<TicketIcon />} text="Digital ticket" />
            <Divider vertical />
            <Badge icon={<WheelchairIcon />} text="Wheelchair accessible" />
            <Divider vertical />
            <Badge icon={<GuideIcon />} text="In-person guide" />
          </div>

          <div className="stadium-tour-page__discount-alert">
            <div className="stadium-tour-page__discount-content">
              <div className="stadium-tour-page__discount-icon">
                <CheckCircleIcon />
              </div>
              <div className="stadium-tour-page__discount-text-wrapper">
                <div className="stadium-tour-page__discount-text">
                  <p className="stadium-tour-page__discount-title">
                    Member's discounts applied at basket
                  </p>
                </div>
                <div className="stadium-tour-page__discount-actions">
                  <button className="stadium-tour-page__discount-link">
                    Sign in / Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BookingWidget price="£22" priceLabel="from" />

        <div className="stadium-tour-page__section stadium-tour-page__section--tours">
          <TourCard
            image={tourCardImage}
            title="Stadium and Academy tour"
            price="From £26 per person"
            description="Exclusive combined tour of the Etihad Stadium and the City Football Academy."
            badges={['Most popular', '120 mins']}
            onMoreInfo={() => console.log('More info clicked')}
          />
        </div>
      </main>
    </div>
  );
}

export default StadiumTourPage;
