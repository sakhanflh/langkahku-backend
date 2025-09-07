import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    total: { type: Number, required: true },
    paid: { type: Number, default: 0 },
    dueDate: { type: Date, required: true }
}, { timestamps: true });

const Loan = mongoose.model("Loan", loanSchema);
export default Loan;
