import React, { useEffect, useState } from "react";

const Profile = (props) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    props.auth.getProfile((profile, error) => {
      if (error) return setError(error);
      return setProfile(profile);
    })
  },[])

  if (!profile) return null;
  
  return (
    <>
      <h1>Profile</h1>
      {/* <p>{profile.nickname}</p> */}
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  )


}

export default Profile;
