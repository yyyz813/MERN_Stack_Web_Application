import { ListGroup } from 'react-bootstrap'
const SideList = (props) =>{
    var makeApp = null;
    var favTutors = null;
    var giveFeedback = null;
    var editTutorProfile = null;
    if(!props.isTutor){ // if not tutor, i.e. student
        makeApp = (
            <ListGroup.Item as="li">
                <a  href='/allAppointments'>Make Appointments</a>
            </ListGroup.Item>
        )
        favTutors = (
            <ListGroup.Item as="li">
                <a  href='/addFavorite'>Favorite Tutors</a>
            </ListGroup.Item>
        )
        giveFeedback = (
            <ListGroup.Item as="li">
                <a  href='/feedbacks'>Give Feedbacks</a>
            </ListGroup.Item>
        )
    }else{
        editTutorProfile = (
            <ListGroup.Item as="li">
                <a  href='/addTutor'>Edit Tutor Profile</a>
            </ListGroup.Item>
        )
    }
    return(
        <ListGroup as="ul" style={{marginLeft:"5%",marginRight:"5%"}}>
            <ListGroup.Item as="li" style={{backgroundColor:"black"}} active>
                Get Started
            </ListGroup.Item>
            <ListGroup.Item as="li">
                <a  href='/allTutors'>Find Your Tutor </a>
            </ListGroup.Item>

            {makeApp}
            {favTutors}
            {giveFeedback}
            
            <ListGroup.Item as="li">
                <a  href='/upcomingAppointments'>Upcoming Appointments</a>
            </ListGroup.Item>

            {editTutorProfile}

            <ListGroup.Item as="li">
                <a  href='/deleteTutor'>Delete (Admin Only)</a>
            </ListGroup.Item>
        </ListGroup>
    )
}
export default SideList