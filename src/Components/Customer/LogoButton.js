import React from 'react'
import Link from 'next/link';
import { Ticket } from 'lucide-react';
import { HOME_ROUTE } from '@/Constants/routes';

function LogoButton() {
  return (
     <div className="flex gap-2">
          {/* Logo */}
          <Link
            href={HOME_ROUTE}
            className="bg-primary w-10 h-10 rounded-lg flex items-center justify-center"
          >
            <Ticket className="w-5 h-5 text-white" />
          </Link>
          <Link href={HOME_ROUTE} className="flex items-center space-x-3">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              OMX <span className="text-primary">Cinemas</span>
            </span>
          </Link>
        </div>
  )
}

export default LogoButton;
