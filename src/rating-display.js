import { ratingToColor } from './utils';
import React from 'react';

export const RatingDisplay = ({ users }) => { // component that displays the current ratings
  return (
    <ul className='rating' id='rating-display'>
      {users.map((user) => (
        <li key={user.handle}>
        <h3 className={ratingToColor(user.rating)}>
          {user.handle} {user.rating}
        </h3>
        </li>
      ))}
    </ul>
    // <textarea name="ratings" id="ratings" cols="30" rows="10" readOnly>
    // {users.map((user) => (
    //   <h3 className={ratingToColor(user.rating)}>
    //     {user.handle} {user.rating}
    //   </h3>
    // ))}
    // </textarea>
  )
}