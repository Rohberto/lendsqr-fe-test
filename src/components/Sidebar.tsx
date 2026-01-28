import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BadgeIcon from "../assets/Icons/badge.svg";
import BankIcon from "../assets/Icons/bank.svg";
import BriefcaseIcon from "../assets/Icons/briefcase.svg";
import ChartBarIcon from "../assets/Icons/chart-bar.svg";
import CheckUserIcon from "../assets/Icons/check-user.svg";
import ClipboardIcon from "../assets/Icons/clipboard.svg";
import CogIcon from "../assets/Icons/cog.svg";
import CoinsIcon from "../assets/Icons/coins.svg";
import DropIcon from "../assets/Icons/drop.svg";
import FriendIcon from "../assets/Icons/friend.svg";
import GalaxyIcon from "../assets/Icons/galaxy.svg";
import HandshakeIcon from "../assets/Icons/handshake.svg";
import HomeIcon from "../assets/Icons/home.svg";
import Transaction from "../assets/Icons/icon.svg";
import LoanIcon from "../assets/Icons/loan1.svg";
import Loan1Icon from "../assets/Icons/sack.svg";
import PiggyIcon from "../assets/Icons/piggy.svg";
import ScrollIcon from "../assets/Icons/scroll.svg";
import SlidersIcon from "../assets/Icons/sliders.svg";
import UserTimesIcon from "../assets/Icons/user-times.svg";
import Users1Icon from "../assets/Icons/user.svg";

interface MenuItem {
  icon: string;
  label: string;
  path?: string;
}

interface MenuSection {
  title?: string;
  items: MenuItem[];
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const location = useLocation();
  
  const menuSections: MenuSection[] = [
    {
      items: [
        { icon: BriefcaseIcon, label: 'Switch Organization' }
      ]
    },
    {
      items: [
        { icon: HomeIcon, label: 'Dashboard', path: '/dashboard' }
      ]
    },
    {
      title: 'CUSTOMERS',
      items: [
        { icon: FriendIcon, label: 'Users', path: '/dashboard/users' },
        { icon: Users1Icon, label: 'Guarantors', path: '/dashboard/guarantors' },
        { icon: Loan1Icon, label: 'Loans', path: '/dashboard/loans' },
        { icon: HandshakeIcon, label: 'Decision Models', path: '/dashboard/decision-models' },
        { icon: PiggyIcon, label: 'Savings', path: '/dashboard/savings' },
        { icon: LoanIcon, label: 'Loan Requests', path: '/dashboard/loan-requests' },
        { icon: CheckUserIcon, label: 'Whitelist', path: '/dashboard/whitelist' },
        { icon: UserTimesIcon, label: 'Karma', path: '/dashboard/karma' }
      ]
    },
    {
      title: 'BUSINESSES',
      items: [
        { icon: BriefcaseIcon, label: 'Organization', path: '/dashboard/organization' },
        { icon: LoanIcon, label: 'Loan Products', path: '/dashboard/loan-products' },
        { icon: BankIcon, label: 'Savings Products', path: '/dashboard/savings-products' },
        { icon: CoinsIcon, label: 'Fees and Charges', path: '/dashboard/fees-charges' },
        { icon: Transaction, label: 'Transactions', path: '/dashboard/transactions' },
        { icon: GalaxyIcon, label: 'Services', path: '/dashboard/services' },
        { icon: CogIcon, label: 'Service Account', path: '/dashboard/service-account' },
        { icon: ScrollIcon, label: 'Settlements', path: '/dashboard/settlements' },
        { icon: ChartBarIcon, label: 'Reports', path: '/dashboard/reports' }
      ]
    },
    {
      title: 'SETTINGS',
      items: [
        { icon: SlidersIcon, label: 'Preferences', path: '/dashboard/preferences' },
        { icon: BadgeIcon, label: 'Fees and Pricing', path: '/dashboard/fees-pricing' },
        { icon: ClipboardIcon, label: 'Audit Logs', path: '/dashboard/audit-logs' }
      ]
    }
  ];
  
const isActive = (path?: string) => {
  if (!path) return false;
  if (location.pathname === path) return true;
  
  if (path !== '/dashboard') {
    return location.pathname.startsWith(`${path}/`);
  }
  
  return false;
};

  const handleLinkClick = () => {
    // Close sidebar on mobile when link is clicked
    if (onClose) {
      onClose();
    }
  };
  
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-content">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="menu-section">
            {section.title && (
              <div className="section-title">{section.title}</div>
            )}
            <ul className="menu-list">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="menu-item">
                  {item.path ? (
                    <Link
                      to={item.path}
                      className={`menu-link ${isActive(item.path) ? 'active' : ''}`}
                      onClick={handleLinkClick}
                    >
                      {item.icon && (
                        <img className="menu-icon" src={item.icon} alt="" aria-hidden="true" />
                      )}
                      <span className="menu-label">{item.label}</span>
                    </Link>
                  ) : (
                    <button className="menu-link">
                      {item.icon && (
                        <img className="menu-icon" src={item.icon} alt="" aria-hidden="true" />
                      )}
                      <span className="menu-switch">{item.label}</span>
                      <img className="drop-icon" src={DropIcon} alt="" aria-hidden="true" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;