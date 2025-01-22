import React, {useState} from 'react';
import type {DrawerProps} from 'antd';
import {Drawer} from 'antd';

interface DrawerAntdProps {
  onClose: () => void;
  placement?: 'right' | 'left';
  closable?: boolean;
  open: boolean;
  children: React.ReactNode;
  headingContent?: React.ReactNode;
  moreContent?: React.ReactNode;
}

function DrawerAntd({
  onClose,
  placement = 'right',
  closable = true,
  open,
  children,
  headingContent = null,
  moreContent = null,
}: DrawerAntdProps) {
  return (
    <Drawer
      onClose={onClose}
      placement={placement}
      closable={closable}
      open={open}
    >
      {/* Optional Heading Content */}
      {headingContent && <div>{headingContent}</div>}

      {/* Drawer Children */}
      {children}

      {/* Optional More Content */}
      {moreContent && <div>{moreContent}</div>}
    </Drawer>
  );
}

export function DrawerContainer() {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <DrawerAntd
      onClose={onClose}
      open={open}
      headingContent="Drawer Heading"
      moreContent="More content here"
    >
      <p>This is the drawer content</p>
    </DrawerAntd>
  );
}
