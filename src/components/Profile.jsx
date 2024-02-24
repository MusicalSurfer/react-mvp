const Profile = ({ user }) => {

    return (
        <div>
            <div id='recentActivity'>Recent Activity:</div>
            <div>{user.recent_activity}</div>
        </div>
    )
}
export default Profile;