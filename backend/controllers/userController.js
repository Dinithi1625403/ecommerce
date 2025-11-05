import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    // Use ID from route parameter if provided, otherwise use token
    const userId = req.params.id || req.user.id;

    // Verify user can only update their own profile
    if (req.params.id && req.params.id !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this profile" });
    }

    const updateData = { name, phone, address };
    
    // Handle profile picture if uploaded
    if (req.file) {
      updateData.profilePic = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user object wrapped in response
    res.json({
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        role: updatedUser.role,
        profilePic: updatedUser.profilePic,
        createdAt: updatedUser.createdAt
      }
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
