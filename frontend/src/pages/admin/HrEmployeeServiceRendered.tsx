import { useGetUsers } from "../../hooks/useGetHumanResourceEmployee";

const HrEmployeeServiceRendered = () => {
    const {
        data: employees,
        isLoading,
        isError,
        error,
    } = useGetUsers();

    if (isLoading) {
        return <p>Loading employees...</p>;
    }

    if (isError) {
        return <p>{error.message}</p>;
    }

    return (
        <div>
            <h2>Human Resource Employees</h2>

            {employees?.length ? (
                employees.map((employee) => (
                    <div key={employee._id}>
                        <p>
                            Name: {employee.firstName}{" "}
                            {employee.lastName}
                        </p>
                        <p>Role: {employee.role}</p>
                        <p>Status: {employee.status}</p>
                    </div>
                ))
            ) : (
                <p>No employees found.</p>
            )}
        </div>
    );
};

export default HrEmployeeServiceRendered;