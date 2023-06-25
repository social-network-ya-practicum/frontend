import PropTypes from 'prop-types';
import UserAddressCard from '../user-address-card/user-address-card';
import styles from './contacts-list.module.scss';

function ContactsList({ contacts }) {
  return (
    <ul className={styles.contactsList}>
      {contacts.map((employee) => (
        <li key={employee.id}>
          <UserAddressCard
            id={employee.id}
            avatar={employee.photo}
            firstName={employee.first_name}
            middleName={employee.middle_name}
            lastName={employee.last_name}
            position={employee.job_title}
            jobEmail={employee.email}
            jobPhone={employee.corporate_phone_number}
          />
        </li>
      ))}
    </ul>
  );
}

export default ContactsList;

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      photo: PropTypes.string,
      first_name: PropTypes.string.isRequired,
      middle_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      job_title: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      corporate_phone_number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
