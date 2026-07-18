// Reusable "Apply Now" call-to-action.
// Scrolls to the application form on the homepage, or navigates home first
// (from any other page) and then scrolls once the page has mounted.
import { useNavigate, useLocation } from 'react-router-dom';
import { goToApplicationForm } from '../utils/scrollToForm';

const ApplyNow = ({ className = '', children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => goToApplicationForm(navigate, location.pathname);

  return (
    <button onClick={handleClick} className={className}>
      {children || 'Apply Now →'}
    </button>
  );
};

export default ApplyNow;
