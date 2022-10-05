import { createGlobalStyle } from "styled-components";

export const breakpoints = { tablet: "600px" };

export default createGlobalStyle`
    :root {

        
      --primary-color: #360482;
      /* --accent-bg-color: rgba(204, 85, 0, 0.1); */
      --front-title-padding: 20px; 
      /* --header-height: 50px; */
      --max-content-width: 1200px;
      --heading-font-family: 'Teko', sans-serif;
      --user-img-width: 120px;
    
      --header-font-color: #FFFFFF;

      --button-width: 100px;      
      --button-height: 50px;
      --button-background-color: #8D45FA;
      --button-font-color: #FFFFFF;
      --button-font-size: 20px;
      --button-border-radius: 10px;
      
      --menu-button-background-color: #5518DA;

      --logsign-button-width: 150px;

      // I added some values.
      --header-font-size: 30px;
      --header-padding-lr: 30px;
      
      --front-show-panel-width: 800px;
      --front-show-panel-height: 550px;
            
      --front-page-background-image: '/images/photo_montreal.jpg';
    
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        box-sizing: border-box;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    h1, h2, h3 {
      color: var(--primary-color);
      font-family: var(--heading-font-family);
    }
    h2 {
      font-size: 28px;
    }
`;
