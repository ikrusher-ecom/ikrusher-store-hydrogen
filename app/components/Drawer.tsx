import {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';

import {Heading} from '~/components/Text';
import {IconClose} from '~/components/Icon';

/**
 * Drawer component that opens on user click.
 * @param heading - string. Shown at the top of the drawer.
 * @param open - boolean state. if true opens the drawer.
 * @param onClose - function should set the open state.
 * @param openFrom - right, left
 * @param children - react children node.
 */
export function Drawer({
  heading,
  open,
  onClose,
  openFrom = 'right',
  children,
  headingContent = null,
  moreContent = null,
}: {
  heading?: string;
  open: boolean;
  onClose: () => void;
  openFrom: 'right' | 'left';
  children: React.ReactNode;
  headingContent: React.ReactNode;
  moreContent: React.ReactNode;
}) {
  const offScreen = {
    right: 'translate-x-full',
    left: '-translate-x-full',
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 left-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 w-screen min-h-screen" />
        </Transition.Child>

        <div className="fixed inset-0 w-screen min-h-screen">
          <div className="absolute inset-0">
            <div className={`fixed inset-0 flex w-screen h-screen right-0`}>
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-600"
                enterFrom={offScreen[openFrom]}
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo={offScreen[openFrom]}
              >
                <Dialog.Panel className="overflow-y-scroll w-screen h-screen text-left align-middle transition-all transform bg-contrast">
                  <header
                    className={`z-40 bg-themeColor text-contrast sticky top-0 flex items-center px-4 h-nav md:px-8 ${
                      heading ? 'justify-between' : 'justify-end'
                    }`}
                  >
                    {/* {heading !== null && (
                      <Dialog.Title>
                        <Heading as="span" size="lead" id="cart-contents">
                          {heading}
                        </Heading>
                      </Dialog.Title>
                    )} */}
                    {headingContent !== null && (
                      <Dialog.Title>
                        <Heading as="span" size="lead" id="cart-contents">
                          {headingContent}
                        </Heading>
                      </Dialog.Title>
                    )}
                    <div className={`flex flex-row items-center gap-x-2`}>
                      {moreContent !== null && <>{moreContent}</>}
                      <button
                        type="button"
                        className="p-4 -m-4 transition text-primary hover:text-primary/50"
                        onClick={onClose}
                        data-test="close-cart"
                      >
                        <IconClose
                          aria-label="Close panel"
                          fill={`#fff`}
                          stroke={`#fff`}
                        />
                      </button>
                    </div>
                  </header>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

/* Use for associating arialabelledby with the title*/
Drawer.Title = Dialog.Title;

export function useDrawer(openDefault = false) {
  const [isOpen, setIsOpen] = useState(openDefault);

  function openDrawer() {
    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
}
