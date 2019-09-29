// @flow
import React from 'react';
import Checkbox from '../../Checkbox';

import styles from './OptionItem.module.css';

type Props = {
  selected: boolean,
  name: string,
  code: string,
  onChange: (code:string, value:boolean) => void
}

const OptionItem = ({selected, name, code, onChange}: Props) => (
  <div onClick={() => onChange(code, !selected)} className={styles.wrapper}>
    <Checkbox
      name={code}
      value={selected}
    />
    <div className={styles.name}>
      {name}
    </div>
  </div>
)

export default OptionItem;