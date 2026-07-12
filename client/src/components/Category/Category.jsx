import React from 'react'
import {categoryInfos} from './categoryFullInfos'
import CategoryCard from './CategoryCard'
import classes from './category.module.css'

function Category() {
  return (
    <section className={classes.categoryContainer}>
      {
        categoryInfos.map((info) => {
          return <CategoryCard data={info} key={info.name} />
        })
      }
    </section>
  )
}

export default Category