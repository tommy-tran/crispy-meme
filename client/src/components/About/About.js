import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="About">
      <div className="About__Title">About</div>
      <div className="About__Description">
        <span style={{ fontWeight: '700' }}>Key Features:</span>
        <ul className="About__Keypoints">
          <li>Security via uniquely generated keys</li>
          <li>
            Great responsive design that allows for full functionality on mobile
            or small screened devices (try using dev tools or{' '}
            <a href="http://mobiletest.me/htc_one_emulator/?u=https://hidden-plains-31601.herokuapp.com/">
              here
            </a>)
          </li>
          <li>
            Exposes RESTful API aimed for game developers to leverage (details of API
            endpoints are on the <a href="https://github.com/tommy-tran/crispy-meme">github repo</a>)
          </li>
        </ul>
        <p>
          Leaderboards are scoreboards which show information about the top
          players within a game or competition. 
        </p>
        <p>
          <strong>Crispy Leaderboards</strong> is a leaderboard management
          application that also exposes a fully functional RESTful API. Users
          may create and manage multiple leaderboards via the private key given
          after Leaderboard creation. This private key allows users to reaccess
          already created leaderboards with full privileges. In addition to
          this, the creator of the leaderboard can share the public key which
          allows users to view the leaderboard without having access to
          management features.
        </p>
        Actions that users with private access may perform are:
        <ul>
          <li>Add Users</li>
          <li>Delete Users</li>
          <li>Delete the leaderboard</li>
          <li>Clear the leaderboard data</li>
        </ul>
        Users with public access may only view limited learderboard information
        and may not perform any of the above actions
      </div>
    </div>
  );
};

export default About;
