import PropTypes from 'prop-types';
import { useState } from 'react';
import copy from 'clipboard-copy';
import shareBtn from '../../images/shareIcon.svg';

function ShareButton({ testId }) {
  const [copyLink, setCopyLink] = useState(false);

  const handleClickShareBtn = () => {
    copy(window.location.href);
    setCopyLink(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleClickShareBtn }
        data-testid={ testId }
      >
        <img
          src={ shareBtn }
          alt="Compartilhar Receita"
        />
      </button>
      {copyLink && <small>Link copied!</small>}
    </div>
  );
}
ShareButton.propTypes = {
  testId: PropTypes.string.isRequired,
};
export default ShareButton;
