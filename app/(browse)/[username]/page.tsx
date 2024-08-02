interface UsernameProps {
  params: {
    username: string;
  };
}
const UserPage = ({ params }: UsernameProps) => {
  return <div>User:{params.username}</div>;
};

export default UserPage;
