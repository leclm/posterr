import React from "react";
import { useParams } from "react-router-dom";

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  return (
    <div>
      <h1>Perfil de {username}</h1>
      <p>Informações do usuário...</p>
    </div>
  );
};

export default Profile;
