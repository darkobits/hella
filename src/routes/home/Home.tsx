import { styled } from 'linaria/react';
import React from 'react';
import { Row, Col, Jumbotron } from 'react-bootstrap';
import { Img } from 'react-image';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { routes } from 'routes';
import headerUrl from './hella-header.png';

// ----- Styles ----------------------------------------------------------------

const Styled = {
  Home: styled.div`
    & img {
      max-width: 640px;
      margin-bottom: 24px;
      opacity: 0.64;
      max-width: 100%;
    }
  `,
  Heading: styled.div`
    display: flex;
    align-items: flex-end;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    overflow: hidden;
    padding-left: 50px;
    padding-right: 50px;
    max-width: 800px;
  `
};

// ----- Home ------------------------------------------------------------------

export const Home = () => {
  const history = useHistory();

  const handle404 = React.useCallback(() => {
    history.push(`/${uuid()}`);
  }, [history]);

  return (
    <Styled.Home>
      <Row className="mt-4">
        <Col xs="12">
          <Jumbotron className="bg-dark pb-3">
            <Styled.Heading>
              <Img src={headerUrl} alt="Hella" />
              <div className="text-secondary ml-4">
                {process.env.VERSION}
              </div>
            </Styled.Heading>
            <p className="lead mt-4">
              {process.env.DESCRIPTION}
            </p>
            <hr className="my-4 pb-1 border-light" />
            <Link
              to={routes.get('page1').pathname}
              className="btn btn-light btn-lg mr-3 mb-3"
            >
              {routes.get('page1').label}
            </Link>
            <button
              className="btn btn-lg btn-secondary mr-3 mb-3"
              type="button"
              onClick={handle404}
            >
              Five-dollar toast
            </button>
          </Jumbotron>
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
    </Styled.Home>
  );
};

// Required for React.lazy / import().
export default Home;
