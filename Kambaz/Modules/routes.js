import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {
    const deleteModule = async (req, res) => {
        try {
            const { moduleId } = req.params;
            console.log("Deleting module:", moduleId);
            const status = await modulesDao.deleteModule(moduleId);
            console.log("Delete result:", status);
            res.json({ success: true, deletedCount: status.deletedCount });
        } catch (error) {
            console.error("Error deleting module:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
    
    const updateModule = async (req, res) => {
        try {
            const { moduleId } = req.params;
            const moduleUpdates = req.body;
            console.log("Updating module:", moduleId, "with updates:", moduleUpdates);
            const status = await modulesDao.updateModule(moduleId, moduleUpdates);
            console.log("Update result:", status);
            
            // 获取更新后的模块
            const updatedModule = await modulesDao.findModuleById(moduleId);
            res.json(updatedModule);
        } catch (error) {
            console.error("Error updating module:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
    
    app.put("/api/modules/:moduleId", updateModule);
    app.delete("/api/modules/:moduleId", deleteModule);
}

