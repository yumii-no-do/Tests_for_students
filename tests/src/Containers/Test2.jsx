import React from 'react';
import { connect } from 'react-redux';


class Test2 extends React.Component {
    render() {
        return (
            <div>Test</div>
        )
    }
}
function mapStateToProps(state) {

    return {
        user: {
            name: state.user.displayName,
            email: state.user.email,
            photoUrl: state.user.photoURL,
            emailVerified: state.user.emailVerified,
            teacherVerified: state.user.teacherVerified,
            uid: state.user.uid,
            signedIn: state.user.isSignedIn,
            loading: state.user.loading,
        },
        signedIn: state.user.isSignedIn,
        usersLoading: state.users.loading,
        themesLoading: state.themes.loading,
        groupsLoading: state.groups.loading,

    };
}
export default connect(mapStateToProps, {})(Test2);