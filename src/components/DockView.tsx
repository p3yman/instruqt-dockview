import {
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanelProps,
  DockviewDefaultTab,
  IDockviewPanelHeaderProps,
} from "dockview";
import Editor from "@monaco-editor/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import example from "../example.md?raw";
import { HoistedDockviewPanel } from "./HoistedDockviewPanel";
import { RightHeaderActionsComponent } from "./RightHeaderActionsComponent";

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

export const DockView: React.FC = (props: { theme?: string }) => {
  const screenW = window.innerWidth;
  const onReady = (event: DockviewReadyEvent) => {
    const first = event.api.addPanel({
      id: "editor",
      component: "editor",
      title: "Editor",
      params: {
        value: "// start coding here\n",
      },
    });

    event.api.addPanel({
      id: "docs",
      component: "iframe",
      title: "Documentation",
      params: {
        title: "Documentation",
        url: "https://en.wikipedia.org/wiki/Main_Page",
      },
    });

    event.api.addPanel({
      id: "fun",
      component: "iframe",
      title: "Fun 😁",
      params: {
        title: "Documentation",
        url: "https://www.youtube.com/embed/oHg5SJYRHA0?autoplay=1",
      },
    });

    event.api.addPanel({
      id: "assignment",
      component: "assignment",
      title: "Assignment",
      params: {
        value: example,
      },
      tabComponent: "tabComponentWithoutClose",
      position: { referencePanel: first.id, direction: "right" },
    });

    // Bottom
    const attempts = event.api.addPanel({
      id: "attempts",
      component: "default",
      params: {
        title: "Attempts",
      },
      position: { referencePanel: first.id, direction: "below" },
    });
    attempts.api.setTitle("Attempts");
    attempts.api.setSize({ width: screenW * 0.7, height: 300 });

    event.api.addPanel({
      id: "output",
      title: "Output",
      component: "default",
      params: {
        title: "Output",
      },
    });

    event.api.addPanel({
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
