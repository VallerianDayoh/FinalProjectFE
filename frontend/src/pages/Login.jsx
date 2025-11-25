import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sparkles } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    if (isAuthenticated) {
        navigate('/');
    }

    const handleGoogleSuccess = (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            const userData = {
                id: decoded.sub,
                name: decoded.name,
                email: decoded.email,
                avatar: decoded.picture,
            };
            login(userData);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleGoogleError = () => {
        console.error('Google Login Failed');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12">
            <div className="w-full max-w-md">
                <div className="card">
                    <div className="card-body text-center space-y-6">
                        <div className="flex justify-center">
                            <div className="p-4 bg-gradient-primary rounded-full">
                                <Sparkles className="w-12 h-12 text-white" />
                            </div>
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold mb-2">Welcome to Glowcare</h1>
                            <p className="text-gray-600">Sign in to access your account and start shopping</p>
                        </div>

                        <div className="flex justify-center">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                                theme="filled_blue"
                                size="large"
                                text="signin_with"
                                shape="rectangular"
                            />
                        </div>

                        <div className="text-sm text-gray-500">
                            By signing in, you agree to our Terms of Service and Privacy Policy
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
