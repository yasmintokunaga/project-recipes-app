import React from 'react';

export default function Profile() {
  return (
    <div>
      <label htmlFor="email">
        Email
        <input
          type="email"
          data-testid="profile-email"
        />
      </label>
      <button
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
    </div>
  );
}
