// @flow
import React from 'react';
import cn from 'classnames';
import map from 'lodash/map';

import styles from './ButtonSwitcher.module.css';

type Props = {
  value: string,
  onChange: (code:string) => void,
  buttons: Array<{
    name: string,
    code: string
  }>
}

export default ({value, onChange, buttons}: Props) => (
  <div className={styles.wrapper}>
    {map(buttons, ({name, code}) => (
      <button
        key={code}
        onClick={() => onChange(code)}
        className={cn(styles.button, {
          [styles.active]: code === value
        })}
      >{name}</button>
    ))}
  </div>
)