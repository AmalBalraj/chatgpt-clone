import { useMutation, useQueryClient } from "react-query";
import "./dashboardPage.css";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    const queryClient = useQueryClient();

    const navigate = useNavigate()

    const mutation = useMutation(
        (text) => {
            return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            }).then(res=>res.json());
        },
        {
            onSuccess: (id) => {
                // Invalidate and refetch
                console.log(id)
                
                queryClient.invalidateQueries({ queryKey: ["userChats"] });
                navigate(`/dashboard/chats/${id}`)
            },
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target.text.value;

        if (!text) return;

        mutation.mutate(text)
    };
    return (
        <div className="dashboardPage">
            <div className="texts">
                <div className="logo">
                    <img src="/logo.png" alt="" />
                    <h1>MAL-AI</h1>
                </div>
                <div className="options">
                    <div className="option">
                        <img src="/chat.png" alt="" />
                        <span>Create a new chat</span>
                    </div>
                    <div className="option">
                        <img src="/image.png" alt="" />
                        <span>Analyze image</span>
                    </div>
                    <div className="option">
                        <img src="/code.png" alt="" />
                        <span>Help with code</span>
                    </div>
                </div>
            </div>
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="text"
                        placeholder="Ask me anything..."
                    />
                    <button>
                        <img src="/arrow.png" alt="" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DashboardPage;
