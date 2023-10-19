import { Menu } from "@headlessui/react";
import { IDockviewHeaderActionsProps } from "dockview";
import { clsx } from "clsx";
import { nanoid } from "nanoid";
import example from "../example.md?raw";

import { RiAddFill } from "react-icons/ri";

interface Item {
  label: string;
  component: string;
  params?: {
    [key: string]: string;
  };
}

const items: Item[] = [
  {
    label: "Editor",
    component: "editor",
    params: {
      value: "// A new editor",
    },
  },
  {
    label: "Browser",
    component: "iframe",
    params: {
      url: "https://programiz.pro",
    },
  },
  {
    label: "Documentation",
    component: "iframe",
    params: {
      url: "https://en.wikipedia.org/wiki/Entry_of_James_VI_into_Edinburgh",
    },
  },
  {
    label: "Assignment",
    component: "assignment",
    params: {
      value: example,
    },
  },
  {
    label: "Notes",
    component: "assignment",
    params: {
      value: "## Notes\n\nThis is a note",
    },
  },
];

export const RightHeaderActionsComponent = (
  props: IDockviewHeaderActionsProps
) => {
  const addPanel = (item: Item) => {
    props.containerApi.addPanel({
      id: `${item.label.toLowerCase()}-${nanoid()}`,
      component: item.component,
      title: item.label,
      params: item.params,
    });
  };

  return (
    <div className="relative z-[9999]">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button>
              <div
                className={clsx(
                  "w-[35px] h-[35px] flex items-center justify-center transition-all",
                  "text-white opacity-50 hover:bg-white/5 hover:opacity-100",
                  open && "bg-white/5 opacity-100"
                )}
              >
                <RiAddFill className="text-xl" />
              </div>
            </Menu.Button>
            {open && (
              <Menu.Items className="bg-gray-900 text-white w-40 shadow-md flex flex-col gap-1 z-50 p-2">
                {items.map((item) => (
                  <Menu.Item key={item.label}>
                    <button
                      className={clsx(
                        "p-2 hover:bg-white/5 block w-full text-left cursor-pointer transition-all rounded"
                      )}
                      onClick={() => addPanel(item)}
                    >
                      {item.label}
                    </button>
                  </Menu.Item>
                ))}
              </Menu.Items>
            )}
          </>
        )}
      </Menu>
    </div>
    // <div className="w-[35px] h-[35px] flex items-center justify-center p-1 relative">
    //   <button
    //     className="text-white opacity-50 p-2 hover:bg-white/5 hover:opacity-100 transition-all"
    //     onClick={() => setShowDropdown(!showDropdown)}
    //   >
    //     <RiAddFill className="text-xl" />
    //   </button>
    //   {showDropdown && (
    //     <div className="absolute top-full left-0 bg-white w-40 rounded shadow-md flex flex-col gap-1 z-50 p-2">
    //       <Item>Terminal</Item>
    //       <Item>Browser</Item>
    //       <Item>Documentation</Item>
    //       <Item>Assignment</Item>
    //       <Item>Notes</Item>
    //     </div>
    //   )}
    // </div>
  );
};

const Item = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-2 hover:bg-slate-100 block w-full text-left cursor-pointer">
      {children}
    </div>
  );
};
