import React from 'react';

const Footer = () => (
  <div className="mt-24">
    <p className="dark:text-gray-200 text-gray-700 text-center m-20">
      © 2022-{(new Date().getFullYear())} All rights reserved by Candetect.com
    </p>
  </div>
);

export default Footer;
