'use client';

import cx from 'classnames';
import Link from 'next/link';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';

import ids from 'lib/hash-ids';

import classes from './page.css';


export default function HomePage() {
  const isDarkMode = document.querySelector('html')?.getAttribute('data-bs-theme') === 'dark';

  return (
    <Row>
      <Col xs="12" className="mt-3">
        {/* Jumbotron */}
        <div
          className={cx(
            'p-4',
            'mb-4',
            'rounded',
            isDarkMode ? 'bg-dark' : 'border shadow'
          )}
        >

          {/* Jumbotron Image & Version */}
          <div className={cx(classes.heading, 'mb-4')}>
            <img
              src="/hella-header.png"
              alt="Hella"
              className={cx(
                classes.homeImg,
                !isDarkMode && classes.invert
              )}
              style={{ maxWidth: isMobile ? '100%' : '360px' }}
            />
            <small className="text-secondary ml-4">
              v{process.env.VERSION}{isMobile ? 'm' : ''}
            </small>
          </div>

          {/* Jumbotron Tagline */}
          <p className={cx(!isMobile && 'lead', 'text-sm')}>
            {process.env.DESCRIPTION}
          </p>

          <hr />

          {/* Jumbotron Buttons */}
          <ButtonGroup className="mt-2">
            <Button
              // @ts-expect-error
              as={Link}
              href="/mumblecore"
              variant="light"
              size={isMobile ? 'sm' : 'lg'}
              className="mr-3"
            >
              Mumblecore
            </Button>
            <Button
              // @ts-ignore
              as={Link}
              href={`/${ids.getRandom()}`}
              variant="secondary"
              size={isMobile ? 'sm' : 'lg'}
              className="mr-3"
            >
              Five-dollar toast
            </Button>
          </ButtonGroup>
        </div>

        {/* Copy */}
        <p>
          Meggings 8-bit gentrify man bun post-ironic. Trust fund vinyl hot chicken raw denim. Mixtape
          chia semiotics copper mug gentrify bespoke, man braid air plant salvia shoreditch tacos tilde
          austin try-hard poutine. Pok pok yuccie umami authentic. Kitsch chartreuse hashtag helvetica,
          occupy shoreditch air plant. Vaporware copper mug chia gluten-free butcher tilde put a bird on
          it fingerstache paleo vegan single-origin coffee plaid. Woke coloring book health goth blog
          90's ennui iceland, biodiesel pabst freegan flexitarian taiyaki normcore messenger bag.
        </p>
        <p>
          Art party gentrify food truck woke, slow-carb shaman DIY franzen tilde drinking vinegar cray
          seitan. Salvia lumbersexual roof party asymmetrical slow-carb schlitz chicharrones church-key
          hashtag meggings poutine venmo lo-fi YOLO. Neutra man bun lomo, pop-up drinking vinegar deep v
          craft beer food truck. Fixie gluten-free copper mug affogato pork belly biodiesel asymmetrical
          pickled 8-bit man braid. Yr truffaut sartorial cardigan authentic portland kombucha locavore
          thundercats you probably haven't heard of them. Gentrify chambray salvia ramps, aesthetic
          cliche seitan dreamcatcher synth woke venmo artisan palo santo tofu. Prism banh mi pop-up
          letterpress sustainable chambray.
        </p>
        <p>
          Art party gentrify food truck woke, slow-carb shaman DIY franzen tilde drinking vinegar cray
          seitan. Salvia lumbersexual roof party asymmetrical slow-carb schlitz chicharrones church-key
          hashtag meggings poutine venmo lo-fi YOLO. Neutra man bun lomo, pop-up drinking vinegar deep v
          craft beer food truck. Fixie gluten-free copper mug affogato pork belly biodiesel asymmetrical
          pickled 8-bit man braid. Yr truffaut sartorial cardigan authentic portland kombucha locavore
          thundercats you probably haven't heard of them. Gentrify chambray salvia ramps, aesthetic
          cliche seitan dreamcatcher synth woke venmo artisan palo santo tofu. Prism banh mi pop-up
          letterpress sustainable chambray.
        </p>
      </Col>
    </Row>
  );
}
