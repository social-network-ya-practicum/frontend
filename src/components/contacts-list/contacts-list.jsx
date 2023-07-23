import PropTypes from 'prop-types';
import UserAddressCard from '../user-address-card/user-address-card';
import styles from './contacts-list.module.scss';

function ContactsList({ contacts, userId }) {
  return (
    <ul className={styles.contactsList}>
      {contacts.map((employee) => (
        <li key={employee.id}>
          <UserAddressCard
            linkPath={
              userId === employee.id
                ? `/${employee.id}`
                : `/contacts/${employee.id}`
            }
            avatar={employee.photo}
            firstName={employee.first_name}
            middleName={employee.middle_name}
            lastName={employee.last_name}
            position={employee.job_title}
            department={employee.department}
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
      id: PropTypes.number.isRequired,
      photo: PropTypes.string,
      first_name: PropTypes.string,
      middle_name: PropTypes.string,
      last_name: PropTypes.string,
      job_title: PropTypes.string,
      email: PropTypes.string.isRequired,
      corporate_phone_number: PropTypes.string,
    })
  ).isRequired,
  userId: PropTypes.number.isRequired,
};
