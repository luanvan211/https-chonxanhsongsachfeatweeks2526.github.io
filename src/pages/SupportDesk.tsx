import React from 'react';
import {
    Clock,
    AlertTriangle,
    CheckCircle2,
    ArrowRight,
    Search,
    Filter
} from 'lucide-react';

const SupportDesk: React.FC = () => {
  const tickets = [
    { id: 'T-842', user: 'Alex Johnson', issue: 'QR code not scanning on 500ml Forest Green bottle', status: 'open', priority: 'high', time: '12m ago' },
    { id: 'T-841', user: 'Maria Garcia', issue: 'Token balance not updating after refill at Eco Coffee', status: 'pending', priority: 'medium', time: '1h ago' },
    { id: 'T-839', user: 'Sam Wilson', issue: 'App crashing on map screen (iOS 17)', status: 'closed', priority: 'critical', time: '3h ago' },
    { id: 'T-835', user: 'Chris Lee', issue: 'Subscription payment failed', status: 'open', priority: 'medium', time: '5h ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Support Desk</h2>
          <p className="text-slate-400">Manage user inquiries and technical issues</p>
        </div>
        <div className="flex space-x-3">
            <div className="bg-slate-800 rounded-lg p-1 flex">
                <button className="px-4 py-2 text-xs font-bold bg-indigo-600 text-white rounded-md shadow-sm">All</button>
                <button className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-200">Open</button>
                <button className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-200">Closed</button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
            { label: 'Total Tickets', value: '24', color: 'bg-indigo-500' },
            { label: 'Avg. Response', value: '14m', color: 'bg-emerald-500' },
            { label: 'Unassigned', value: '5', color: 'bg-amber-500' },
            { label: 'Critical', value: '2', color: 'bg-rose-500' },
        ].map(card => (
            <div key={card.label} className="bg-slate-800 border border-slate-700 p-4 rounded-xl">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{card.label}</p>
                <p className="text-2xl font-bold text-white">{card.value}</p>
            </div>
        ))}
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-800/50 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center space-x-2 text-slate-400">
                <Search className="w-4 h-4" />
                <input type="text" placeholder="Filter tickets..." className="bg-transparent border-none outline-hidden text-sm w-64" />
            </div>
            <button className="flex items-center text-xs font-bold text-slate-400 hover:text-white">
                <Filter className="w-3 h-3 mr-2" />
                Advanced Filters
            </button>
        </div>

        <div className="divide-y divide-slate-700">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-700/30 transition-colors gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-black text-indigo-400 tracking-tighter bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{ticket.id}</span>
                  <h4 className="font-bold text-slate-200">{ticket.user}</h4>
                  <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded flex items-center ${
                    ticket.priority === 'critical' ? 'bg-rose-500/10 text-rose-500' :
                    ticket.priority === 'high' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-slate-500/10 text-slate-400'
                  }`}>
                    {ticket.priority === 'critical' && <AlertTriangle className="w-3 h-3 mr-1" />}
                    {ticket.priority}
                  </span>
                </div>
                <p className="text-sm text-slate-400 line-clamp-1">{ticket.issue}</p>
                <div className="flex items-center space-x-4 text-xs text-slate-500">
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {ticket.time}</span>
                  <span className="flex items-center uppercase font-bold tracking-widest text-[9px]">
                    {ticket.status === 'open' ? <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div> :
                     ticket.status === 'pending' ? <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div> :
                     <CheckCircle2 className="w-3 h-3 mr-1 text-slate-500" />}
                    {ticket.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex-1 md:flex-none bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg text-sm font-bold transition-colors border border-slate-600">
                    View Details
                </button>
                <button className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                    <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportDesk;
