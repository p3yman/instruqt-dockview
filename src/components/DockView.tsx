import {
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanelProps,
  DockviewDefaultTab,
  IDockviewPanelHeaderProps,
  DockviewApi,
} from "dockview";
import Editor from "@monaco-editor/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import example from "../example.md?raw";
import { HoistedDockviewPanel } from "./HoistedDockviewPanel";
import { RightHeaderActionsComponent } from "./RightHeaderActionsComponent";
import { useEffect, useState } from "react";

const components = {
  default: (props: IDockviewPanelProps<{ title: string }>) => {
    return (
      <div style={{ padding: "20px", color: "white" }}>
        {props.params.title}
      </div>
    );
  },
  iframe: HoistedDockviewPanel(
    (props: IDockviewPanelProps<{ url: string }>) => {
      return (
        <iframe
          style={{
            width: "100%",
            height: "100%",
          }}
          src={props.params.url}
        />
      );
    }
  ),
  editor: (props: IDockviewPanelProps<{ value: string }>) => {
    return (
      <Editor
        height="90vh"
        defaultLanguage="bash"
        defaultValue={props.params.value}
        theme="vs-dark"
      />
    );
  },
  assignment: (props: IDockviewPanelProps<{ value: string }>) => {
    return (
      <div className="p-4 prose prose-invert max-w-none">
        <Markdown remarkPlugins={[remarkGfm]}>{props.params.value}</Markdown>
      </div>
    );
  },
  terminal: (props: IDockviewPanelProps<{ title: string }>) => {
    return (
      <div className="p-8">
        <h1 className="text-4xl">{props.params.title}</h1>
      </div>
    );
  },
};

const defaultTabComponent = (props: IDockviewPanelHeaderProps) => {
  return <DockviewDefaultTab {...props} />;
};

const tabComponentWithoutClose = (props: IDockviewPanelHeaderProps) => {
  return <DockviewDefaultTab {...props} hideClose />;
};

const tabComponents = {
  defaultTabComponent,
  tabComponentWithoutClose,
};

const createDefaultLayout = (api: DockviewApi) => {
  const screenW = window.innerWidth;

  const first = api.addPanel({
    id: "editor",
    component: "editor",
    title: "Editor",
    params: {
      value: "// start coding here\n",
    },
  });

  api.addPanel({
    id: "docs",
    component: "iframe",
    title: "Documentation",
    params: {
      title: "Documentation",
      url: "https://en.wikipedia.org/wiki/Main_Page",
    },
  });

  api.addPanel({
    id: "fun",
    component: "iframe",
    title: "Fun 😁",
    params: {
      title: "Documentation",
      url: "https://www.youtube.com/embed/oHg5SJYRHA0",
    },
  });

  const assignment = api.addPanel({
    id: "assignment",
    component: "assignment",
    title: "Assignment",
    params: {
      value: example,
    },
    tabComponent: "tabComponentWithoutClose",
    position: { referencePanel: first.id, direction: "right" },
  });
  assignment.group.locked = true;

  // Bottom
  const attempts = api.addPanel({
    id: "attempts",
    component: "default",
    params: {
      title: "Attempts",
    },
    position: { referencePanel: first.id, direction: "below" },
  });
  attempts.api.setTitle("Attempts");
  attempts.api.setSize({ width: screenW * 0.7, height: 300 });

  api.addPanel({
    id: "output",
    title: "Output",
    component: "default",
    params: {
      title: "Output",
    },
  });

  api.addPanel({
    id: "debug console",
    title: "Debug Console",
    component: "default",
    params: {
      title: "Debug Console",
    },
  });

  // Set first as active
  attempts.api.setActive();
  first.api.setActive();
};

export const DockView: React.FC = (props: { theme?: string }) => {
  const [api, setApi] = useState<DockviewApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.onDidLayoutChange(() => {
      const layout = api.toJSON();

      localStorage.setItem(
        "dockview_persistance_layout",
        JSON.stringify(layout)
      );
    });
  }, [api]);

  const clearLayout = () => {
    localStorage.removeItem("dockview_persistance_layout");
    if (api) {
      api.clear();
      createDefaultLayout(api);
    }
  };

  useEffect(() => {
    window.addEventListener("clearLayout", clearLayout);

    return () => {
      window.removeEventListener("clearLayout", clearLayout);
    };
  });

  const onReady = (event: DockviewReadyEvent) => {
    const layoutString = localStorage.getItem("dockview_persistance_layout");

    let success = false;

    if (layoutString) {
      try {
        const layout = JSON.parse(layoutString);
        event.api.fromJSON(layout);
        success = true;
      } catch (err) {
        console.error(err);
      }
    }

    if (!success) {
      createDefaultLayout(event.api);
    }

    setApi(event.api);
  };

  return (
    <DockviewReact
      components={components}
      tabComponents={tabComponents}
      onReady={onReady}
      className={props.theme || "dockview-theme-abyss"}
      leftHeaderActionsComponent={RightHeaderActionsComponent}
    />
  );
};
