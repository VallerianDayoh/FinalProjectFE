import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="section">
            <div className="container max-w-2xl">
                <h1 className="text-4xl font-bold mb-8">My Profile</h1>

                <div className="card">
                    <div className="card-body space-y-6">
                        {/* Profile Avatar */}
                        <div className="flex items-center gap-6">
                            <img
                                src={user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.name}
                                alt={user?.name}
                                className="w-24 h-24 rounded-full border-4 border-[var(--color-primary)]"
                            />
                            <div>
                                <h2 className="text-2xl font-bold">{user?.name}</h2>
                                <p className="text-gray-600">{user?.email}</p>
                            </div>
                        </div>

                        {/* Profile Information */}
                        <div className="border-t pt-6 space-y-4">
                            <h3 className="text-xl font-semibold mb-4">Account Information</h3>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <User className="w-5 h-5 text-gray-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Full Name</p>
                                        <p className="font-medium">{user?.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <Mail className="w-5 h-5 text-gray-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Email Address</p>
                                        <p className="font-medium">{user?.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="border-t pt-6">
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline w-full text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
