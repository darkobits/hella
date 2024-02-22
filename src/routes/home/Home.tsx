import { isMobile } from '@darkobits/tsx/lib/runtime';
import cx from 'classnames';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Img } from 'react-image';
import { Link } from 'react-router-dom';

import ids from 'lib/hash-ids';
import { type RouteProps } from 'routes';

import classes from './Home.css';
import headerUrl from './hella-header.png';

let int = 1;

export const Home = ({ useRouteConfig }: RouteProps) => {
  return (
    <Row>
      <Col xs="12" className="mt-3">
        {/* Jumbotron */}
        <div className={cx(classes.jumbotron, 'bg-dark', 'p-4', 'mb-4', 'rounded')}>

          {/* Jumbotron Image & Version */}
          <div className={cx(classes.heading, 'mb-4')}>
            <Img
              src={headerUrl}
              alt="Hella"
              className={classes.homeImg}
              style={{
                maxWidth: isMobile() ? '100%' : '360px'
              }}
            />
            <small className="text-secondary ml-4">
              v{import.meta.env.VERSION}{isMobile() ? 'm' : ''}
            </small>
          </div>

          {/* Jumbotron Tagline */}
          <p className={cx(!isMobile() && 'lead', 'text-sm')}>
            {import.meta.env.DESCRIPTION}
          </p>

          <hr className="border-light" />

          {/* Jumbotron Buttons */}
          <ButtonGroup className="mt-2">
            <Button
              // @ts-ignore
              as={Link}
              to={useRouteConfig('page1').path}
              variant="light"
              size={isMobile() ? 'sm' : 'lg'}
              className="mr-3"
            >
              {useRouteConfig('page1').label}
            </Button>
            <Button
              // @ts-ignore
              as={Link}
              to={`/${ids.getFor(int += 1)}`}
              variant="secondary"
              size={isMobile() ? 'sm' : 'lg'}
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
};
