// @flow
import React from 'react';
import cn from 'classnames';
import find from 'lodash/find';
import map from 'lodash/map';

import OptionItem from "./OptionItem/OptionItem";
import styles from './Filter.module.css';

type OptionType = {
  [code: string]: string
}

type Props = {
  name: string,
  className?:string,
  value: Array<string>,
  onChangeOption: (code:string, value: boolean) => void,
  options: OptionType,
}

const Filter = ({name, options, onChangeOption, value, className}: Props) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        {name}
      </div>
      <div className={styles.content}>
        <div className={styles.options}>
          {map(options, (name, code) => {
            return (
              <OptionItem
                key={code}
                name={name}
                code={code}
                onChange={onChangeOption}
                selected={!!find(value, (valueCode) => valueCode === code)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Filter;