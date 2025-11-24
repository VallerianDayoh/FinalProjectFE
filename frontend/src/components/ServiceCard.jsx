import React from 'react';
import * as Icons from 'lucide-react';

const ServiceCard = ({ service }) => {
    const IconComponent = Icons[service.icon] || Icons.HelpCircle;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
            <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                <IconComponent className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
            <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-bold text-indigo-600">{service.price}</span>
                <button className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                    Learn more →
                </button>
            </div>
        </div>
    );
};

export default ServiceCard;
