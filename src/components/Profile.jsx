import ProfilePicture from '../assets/5702.jpeg';

const Profile = ({ user }) => {

    // Renders user profile page.
    return (
        <>
            <div className="profile-container">
                <div className="profile-header">
                    <img id="profilePicture" src={ProfilePicture} />
                    <div className='profile-name'>{user.userhandle}</div>
                    <div className='profile-level'>Level {user.level}</div>
                </div>
                <div className="profile-stats">
                    <div className='recent-activity'>Recent Activity: </div>
                    <div className='recent-activity'>{user.recent_activity}</div>
                </div>
            </div>
        </>
    )
}
export default Profile;
