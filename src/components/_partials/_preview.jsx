import React from 'react';

export default function Preview(props) {
  return (
    <html lang="en" dir="ltr" prefix="og: http://ogp.me/ns#" className="no-js fonts-loaded">
      <head>
        <title>{props.title}</title>
        <link rel="stylesheet" href="../../../dist/css/uswds.min.css"/>
        <link rel="stylesheet" href="../../../dist/css/style_vets.css"/>
      </head>
      <body>
        <div dangerouslySetInnerHTML={{ __html: props.yield }} />
        <script src="../../../dist/js/uswds.min.js"></script>
      </body>
    </html>
  );
}
