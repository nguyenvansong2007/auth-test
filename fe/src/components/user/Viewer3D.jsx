import React, { useEffect, useRef } from "react";
import {
  Viewer,
  DefaultViewerParams,
  SpeckleLoader,
  UrlHelper,
} from "@speckle/viewer";
import {
  CameraController,
  SelectionExtension,
} from "@speckle/viewer";

const Viewer3D = () => {
  const viewerRef = useRef(null);
  const viewerInstance = useRef(null);

  useEffect(() => {
    const initViewer = async () => {
      const container = viewerRef.current;
      if (!container) return;

      // Configure viewer parameters
      const params = { ...DefaultViewerParams, showStats: false, verbose: true };

      // Create viewer instance
      const viewer = new Viewer(container, params);
      viewerInstance.current = viewer;

      // Init viewer
      await viewer.init();

      // Add extensions
      viewer.createExtension(CameraController);
      viewer.createExtension(SelectionExtension);

      // Get speckle stream resource URLs
      const urls = await UrlHelper.getResourceUrls(
        "https://app.speckle.systems/projects/24c98619ac/models/38639656b8"
      );

      for (const url of urls) {
        const loader = new SpeckleLoader(viewer.getWorldTree(), url, "");
        await viewer.loadObject(loader, true);
      }
    };

    initViewer();

    return () => {
      if (viewerInstance.current) {
        viewerInstance.current.dispose();
        viewerInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={viewerRef}
      className="w-full h-[600px] border border-gray-300 rounded-md"
    />
  );
};

export default Viewer3D;
