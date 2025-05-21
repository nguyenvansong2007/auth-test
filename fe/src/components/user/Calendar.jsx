import { useState, useEffect, useRef } from "react";
import { Viewer, ViewerEvent } from "@speckle/viewer";
import {
  Home,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize,
  Layers,
  Eye,
  EyeOff,
  Download,
  Share2,
  Settings,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const Calendar = ({ projectId, streamUrl, token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [models, setModels] = useState([]);
  const [activeModel, setActiveModel] = useState(null);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [objectInfo, setObjectInfo] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [layers, setLayers] = useState([]);
  const [hiddenLayers, setHiddenLayers] = useState([]);
  const viewerContainerRef = useRef(null);
  const viewerRef = useRef(null);

  // Sample model data
  const sampleModels = [
    {
      id: "1",
      name: "Office Building",
      description: "3-story office building with underground parking",
      streamId: "streams/0c6ad366c4",
      objectId: "objects/e91a6037599381b3cad3c3e9",
      createdAt: "2023-05-10T10:30:00Z",
      updatedAt: "2023-05-15T14:20:00Z",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Residential Complex",
      description: "Multi-family residential building with 24 units",
      streamId: "streams/1d7be455a2",
      objectId: "objects/f82b7148688492c4dbe4d4f0",
      createdAt: "2023-06-05T09:15:00Z",
      updatedAt: "2023-06-10T11:45:00Z",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      name: "Bridge Structure",
      description: "Cable-stayed bridge spanning 500m",
      streamId: "streams/2e8cf566b3",
      objectId: "objects/g93c8259799503d5ece5e5g1",
      createdAt: "2023-07-20T13:40:00Z",
      updatedAt: "2023-07-25T16:30:00Z",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
  ];

  // Sample layers data
  const sampleLayers = [
    { id: "layer1", name: "Structural", color: "#3B82F6", count: 245 },
    { id: "layer2", name: "Architectural", color: "#10B981", count: 189 },
    { id: "layer3", name: "MEP", color: "#F59E0B", count: 312 },
    { id: "layer4", name: "Interior", color: "#8B5CF6", count: 156 },
    { id: "layer5", name: "Site", color: "#EC4899", count: 78 },
  ];

  useEffect(() => {
    setModels(sampleModels);
    setLayers(sampleLayers);

    if (sampleModels.length > 0) {
      setActiveModel(sampleModels[0]);
    }
  }, []);

  useEffect(() => {
    if (!viewerContainerRef.current || !activeModel) return;

    const initViewer = async () => {
      setIsLoading(true);

      if (viewerRef.current) {
        viewerRef.current.dispose();
      }

      const viewer = new Viewer(viewerContainerRef.current, {
        showStats: false,
        environmentSettings: {
          showGrid: true,
          showAxes: true,
          backgroundGradient: [
            [0.0, 0.0, 0.0, 0.0],
            [0.5, 0.5, 0.5, 1.0],
          ],
        },
      });

      viewer.on(ViewerEvent.ObjectClicked, (event) => {
        console.log("Object clicked:", event);
        if (event.object) {
          setObjectInfo(event.object);
          setShowInfo(true);
        }
      });

      viewer.on(ViewerEvent.ObjectSelected, (event) => {
        console.log("Selection changed:", event);
        setSelectedObjects(event.objects || []);
      });

      try {
        await viewer.loadModel(
          "https://speckle.xyz/streams/0c6ad366c4/objects/e91a6037599381b3cad3c3e9 "
        );
        viewerRef.current = viewer;
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading model:", error);
        setIsLoading(false);
      }
    };

    initViewer();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.dispose();
      }
    };
  }, [activeModel]);

  const handleModelSelect = (model) => {
    setActiveModel(model);
  };

  const handleZoomIn = () => {
    if (viewerRef.current) {
      viewerRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (viewerRef.current) {
      viewerRef.current.zoomOut();
    }
  };

  const handleResetView = () => {
    if (viewerRef.current) {
      viewerRef.current.resetCamera();
    }
  };

  const handleFitView = () => {
    if (viewerRef.current) {
      viewerRef.current.zoom2Fit();
    }
  };

  const toggleLayerVisibility = (layerId) => {
    setHiddenLayers((prev) => {
      if (prev.includes(layerId)) {
        return prev.filter((id) => id !== layerId);
      } else {
        return [...prev, layerId];
      }
    });
    console.log(`Toggle visibility for layer ${layerId}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Home className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-gray-500 text-sm">Projects</span>
            <ChevronRight className="h-4 w-4 text-gray-500 mx-2" />
            <span className="font-medium">
              {activeModel?.name || "3D Viewer"}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </button>
            <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </button>
            <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* Models section */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-800 mb-3">Models</h2>
            <div className="space-y-3">
              {models.map((model) => (
                <div
                  key={model.id}
                  className={`p-2 rounded cursor-pointer ${
                    activeModel?.id === model.id
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleModelSelect(model)}
                >
                  <div className="flex items-center">
                    <img
                      src={model.thumbnail || "/placeholder.svg"}
                      alt={model.name}
                      className="w-10 h-10 rounded object-cover mr-3"
                    />
                    <div>
                      <h3 className="font-medium text-sm text-gray-800">
                        {model.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Updated {new Date(model.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Layers section */}
          <div className="p-4 border-b border-gray-200">
            <div
              className="flex justify-between items-center cursor-pointer mb-3"
              onClick={() => setShowLayers(!showLayers)}
            >
              <h2 className="font-medium text-gray-800">Layers</h2>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  showLayers ? "transform rotate-180" : ""
                }`}
              />
            </div>
            {showLayers && (
              <div className="space-y-2 mt-2">
                {layers.map((layer) => (
                  <div
                    key={layer.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: layer.color }}
                      ></div>
                      <span className="text-sm">{layer.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">
                        {layer.count}
                      </span>
                      <button
                        onClick={() => toggleLayerVisibility(layer.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {hiddenLayers.includes(layer.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Properties section */}
          <div className="flex-1 overflow-auto p-4">
            <h2 className="font-medium text-gray-800 mb-3">Properties</h2>
            {selectedObjects.length > 0 ? (
              <div className="text-sm">
                <p className="text-gray-500 mb-2">
                  {selectedObjects.length} object(s) selected
                </p>
                {objectInfo && (
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="font-medium">ID</p>
                      <p className="text-gray-600 text-xs truncate">
                        {objectInfo.id || "N/A"}
                      </p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="font-medium">Type</p>
                      <p className="text-gray-600 text-xs">
                        {objectInfo.type || "N/A"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Select an object to view its properties
              </p>
            )}
          </div>
        </aside>

        {/* Viewer container */}
        <div className="flex-1 relative">
          <div ref={viewerContainerRef} className="w-full h-full"></div>

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                <p>Loading model...</p>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-lg p-2 flex space-x-2">
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-100 rounded"
              title="Zoom In"
            >
              <ZoomIn className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-100 rounded"
              title="Zoom Out"
            >
              <ZoomOut className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={handleResetView}
              className="p-2 hover:bg-gray-100 rounded"
              title="Reset View"
            >
              <RotateCcw className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={handleFitView}
              className="p-2 hover:bg-gray-100 rounded"
              title="Fit to View"
            >
              <Maximize className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={() => setShowLayers(!showLayers)}
              className={`p-2 rounded ${
                showLayers
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              title="Toggle Layers"
            >
              <Layers className="h-5 w-5" />
            </button>
          </div>

          {/* Object info panel */}
          {showInfo && objectInfo && (
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Object Information</h3>
                <button
                  onClick={() => setShowInfo(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">ID</p>
                  <p className="text-sm truncate">{objectInfo.id || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="text-sm">{objectInfo.type || "N/A"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
