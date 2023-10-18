import {
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanelProps,
  DockviewDefaultTab,
  IDockviewPanelHeaderProps,
} from "dockview";

const components = {
  default: (props: IDockviewPanelProps<{ title: string }>) => {
    return (
      <div style={{ padding: "20px", color: "white" }}>
        {props.params.title}
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
      id: "terminal",
      component: "default",
      title: "Terminal",
      params: {
        title: "Terminal",
      },
    });

    event.api.addPanel({
      id: "docs",
      component: "default",
      title: "Documentation",
      params: {
        title: "Documentation",
      },
    });

    event.api.addPanel({
      id: "terminal-2",
      component: "default",
      title: "Terminal 2",
      params: {
        title: "Terminal 2",
      },
    });

    event.api.addPanel({
      id: "assignment",
      component: "default",
      title: "Assignment",
      params: {
        title: "Assignment",
      },
      tabComponent: "tabComponentWithoutClose",
      position: { referencePanel: "terminal-2", direction: "right" },
    });

    // Bottom
    const attempts = event.api.addPanel({
      id: "attempts",
      component: "default",
      params: {
        title: "Attempts",
      },
      position: { referencePanel: "terminal", direction: "below" },
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
    />
  );
};
