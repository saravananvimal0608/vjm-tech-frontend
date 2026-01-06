const Login = ({ setUser }) => {
    const [name, setName] = useState("");

    return (
        <>
            <input
                placeholder="Enter Name"
                onChange={e => setName(e.target.value)}
            />
            <button onClick={() => setUser(name)}>Login</button>
        </>
    );
};
export default Login;