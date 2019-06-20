import React from 'react';
import { Icon } from '../../../components/atoms/Icon/Icon';

import styles from './ratingicon.module.scss';

/**
 * @author [Roman Semko](mailto:roman.semko-extern@invia.de)
 */
export default function RatingIcon(props) {
  return (
    <Icon
      {...props}
      className={styles.icon}
      path={[
        `M465.292,46.614C437.287,17.829,397.614-0.053,354.038-0.053 H157.161c-42.781,0-82.456,17.882-111.239,46.667C17.899,74.626-0.003,114.328-0.003,157.891v196.865 c0,42.771,17.902,82.482,45.925,111.259c28.783,28.019,68.458,45.895,111.239,45.895h196.877 c43.576,0,83.249-17.876,111.254-45.895c28.794-28.776,46.705-68.488,46.705-111.259V157.891 C511.997,114.328,494.086,74.626,465.292,46.614z M487.874,354.756c0,36.558-14.778,70.014-39.713,94.128 c-24.088,24.133-57.566,38.938-94.123,38.938H157.161c-36.56,0-70.013-14.805-94.137-38.938 c-24.124-24.114-38.901-57.57-38.901-94.128V157.891c0-37.339,14.778-70.022,38.901-94.146 c24.124-24.896,57.577-39.675,94.137-39.675h196.877c36.557,0,70.035,14.778,94.123,39.675 c24.935,24.124,39.713,56.806,39.713,94.146V354.756z M148.502,223.492c26.102,0,47.543-21.45,47.543-47.547 s-21.441-46.623-47.543-46.623c-25.184,0-46.618,20.525-46.618,46.623S123.318,223.492,148.502,223.492z M351.738,223.492 c26.106,0,47.543-21.45,47.543-47.547s-21.437-46.623-47.543-46.623s-47.543,20.525-47.543,46.623 S325.632,223.492,351.738,223.492z M252.45,421.07c131.853,0,151.97-122.213,151.97-122.213H99.673 C99.673,298.857,119.788,421.07,252.45,421.07z M252.45,400.993c-99.705,0-126.249-81.222-126.249-81.222H375.47 C375.47,319.771,351.337,400.993,252.45,400.993z`
      ]}
    />
  );
}