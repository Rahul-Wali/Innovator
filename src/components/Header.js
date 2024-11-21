import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color={showAdd ? 'darkred' : 'darkgreen'} text={showAdd ? 'Collapse' : 'Add Exam'} onClick={onAdd} />
        </header>
    )
}

Header.defaultProps = {
    title: "SmartExam",
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
